/**
 * @generated SignedSource<<f904149966687cbd083c52d6bd5d67b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ModerationPostActionsFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly containers?: ReadonlyArray<{
        readonly url?: string;
      }>;
    };
  }>;
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationRemovePostFormFragment">;
  readonly " $fragmentType": "ModerationPostActionsFragment";
};
export type ModerationPostActionsFragment$key = {
  readonly " $data"?: ModerationPostActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ModerationPostActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModerationPostActionsFragment",
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "containers",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "url",
                          "storageKey": null
                        }
                      ],
                      "type": "MP4VideoContainer",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "type": "VideoMedia",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ModerationRemovePostFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "aa67e369ce5bbdace5840a972ab68188";

export default node;
