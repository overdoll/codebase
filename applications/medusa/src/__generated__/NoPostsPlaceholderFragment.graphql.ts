/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NoPostsPlaceholderFragment = {
    readonly moderatorSettings: {
        readonly isInModeratorQueue: boolean;
    };
    readonly " $refType": "NoPostsPlaceholderFragment";
};
export type NoPostsPlaceholderFragment$data = NoPostsPlaceholderFragment;
export type NoPostsPlaceholderFragment$key = {
    readonly " $data"?: NoPostsPlaceholderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NoPostsPlaceholderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoPostsPlaceholderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ModeratorSettings",
      "kind": "LinkedField",
      "name": "moderatorSettings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInModeratorQueue",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '84d992e4be3665379fff6f8f0bab44c5';
export default node;
