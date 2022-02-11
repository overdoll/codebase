/**
 * @generated SignedSource<<c3442c1a02623b983cca3c602373e738>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddClubSlugAliasFragment$data = {
  readonly id: string;
  readonly slug: string;
  readonly slugAliases: ReadonlyArray<{
    readonly __id: string;
    readonly slug: string;
  }>;
  readonly slugAliasesLimit: number;
  readonly " $fragmentType": "AddClubSlugAliasFragment";
};
export type AddClubSlugAliasFragment = AddClubSlugAliasFragment$data;
export type AddClubSlugAliasFragment$key = {
  readonly " $data"?: AddClubSlugAliasFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddClubSlugAliasFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddClubSlugAliasFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSlugAlias",
      "kind": "LinkedField",
      "name": "slugAliases",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slugAliasesLimit",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "779450f39f1b3a21b08413184c925933";

export default node;
