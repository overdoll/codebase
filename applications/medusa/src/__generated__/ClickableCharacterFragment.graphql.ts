/**
 * @generated SignedSource<<1d717a6e0ed3d0b340df70ed06c88eef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickableCharacterFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly series: {
    readonly slug: string;
  };
  readonly slug: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "ClickableCharacterFragment";
};
export type ClickableCharacterFragment$key = {
  readonly " $data"?: ClickableCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
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
  "name": "ClickableCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "a72042b364b14019f80f36f839d8a390";

export default node;
