/**
 * @generated SignedSource<<149ee5b219b68177adf47e41256a4549>>
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
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"CharacterIconFragment">;
  }>;
  readonly club: {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CharacterIconFragment"
        }
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "78b20aef8551530916e29c888ba72235";

export default node;
