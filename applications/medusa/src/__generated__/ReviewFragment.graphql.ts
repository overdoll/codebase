/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewFragment = {
    readonly post: {
        readonly id: string;
        readonly content: ReadonlyArray<{
            readonly urls: ReadonlyArray<{
                readonly url: unknown;
                readonly mimeType: string;
            }>;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment" | "PostBrandFragment">;
    } | null;
    readonly " $refType": "ReviewFragment";
};
export type ReviewFragment$data = ReviewFragment;
export type ReviewFragment$key = {
    readonly " $data"?: ReviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ReviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "reference"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "reference",
          "variableName": "reference"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
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
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "content",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ResourceUrl",
              "kind": "LinkedField",
              "name": "urls",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mimeType",
                  "storageKey": null
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
          "name": "PostGalleryContentFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostBrandFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'dd4eec181fabcd7ff2c0c0aa4d596d31';
export default node;
