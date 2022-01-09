/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostHeaderContributorFragment = {
    readonly contributor: {
        readonly username: string;
        readonly avatar: string;
    };
    readonly " $refType": "PostHeaderContributorFragment";
};
export type PostHeaderContributorFragment$data = PostHeaderContributorFragment;
export type PostHeaderContributorFragment$key = {
    readonly " $data"?: PostHeaderContributorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostHeaderContributorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderContributorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '77184d3a8885f96bc10e609f0a997b85';
export default node;
