/**
 * @generated SignedSource<<bc8a37dd3dd840e20540d8caeded726b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModeratePostFragment$data = {
  readonly id: string;
  readonly post: {
    readonly characterRequests: ReadonlyArray<{
      readonly __typename: "CharacterRequest";
    }>;
    readonly characters: ReadonlyArray<{
      readonly __typename: "Character";
    }>;
    readonly club: {
      readonly name: string;
    };
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"UpdatePostCharactersModalFragment">;
  };
  readonly " $fragmentType": "ModeratePostFragment";
};
export type ModeratePostFragment$key = {
  readonly " $data"?: ModeratePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModeratePostFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModeratePostFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Club",
          "kind": "LinkedField",
          "name": "club",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CharacterRequest",
          "kind": "LinkedField",
          "name": "characterRequests",
          "plural": true,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Character",
          "kind": "LinkedField",
          "name": "characters",
          "plural": true,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UpdatePostCharactersModalFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostModerator",
  "abstractKey": null
};
})();

(node as any).hash = "6994a45538a586e8520b2274b7dc5a1b";

export default node;
