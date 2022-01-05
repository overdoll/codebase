/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostHeaderClubFragment = {
    readonly club: {
        readonly name: string;
        readonly thumbnail: {
            readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
        } | null;
    };
    readonly " $refType": "PostHeaderClubFragment";
};
export type PostHeaderClubFragment$data = PostHeaderClubFragment;
export type PostHeaderClubFragment$key = {
    readonly " $data"?: PostHeaderClubFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostHeaderClubFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderClubFragment",
  "selections": [
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
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '2935d5aecdf4cb3afdcaa81f2a150c7c';
export default node;