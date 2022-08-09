/**
 * @generated SignedSource<<50245581b152e30f339901a65e966f41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubCharacterRichObjectFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
  } | null;
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubCharacterRichObjectFragment";
};
export type PublicClubCharacterRichObjectFragment$key = {
  readonly " $data"?: PublicClubCharacterRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubCharacterRichObjectFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubCharacterRichObjectFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "a53d774a0a8fa6943121a22a3d905951";

export default node;
