/**
 * @generated SignedSource<<028085dd63a0e4c0673f150292c44469>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostDataFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly banner: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly id: string;
    readonly name: string;
  }>;
  readonly club: {
    readonly banner: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly id: string;
    readonly name: string;
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentType": "RouletteScreenPostDataFragment";
};
export type RouletteScreenPostDataFragment$key = {
  readonly " $data"?: RouletteScreenPostDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
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
      "name": "ResourceIconFragment"
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenPostDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "5683a1c019838f6cfd41f65d434bfc01";

export default node;
