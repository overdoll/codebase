/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArrangeFragment = {
    readonly post: {
        readonly content: ReadonlyArray<{
            readonly id: string;
            readonly urls: ReadonlyArray<{
                readonly url: unknown;
                readonly mimeType: string;
            }>;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
    } | null;
    readonly " $refType": "ArrangeFragment";
};
export type ArrangeFragment$data = ArrangeFragment;
export type ArrangeFragment$key = {
    readonly " $data"?: ArrangeFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeFragment">;
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
  "name": "ArrangeFragment",
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
          "concreteType": "Resource",
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
          "name": "ArrangeUploadsFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProcessUploadsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '3121b7891a0067b7c25e657837106c56';
export default node;
